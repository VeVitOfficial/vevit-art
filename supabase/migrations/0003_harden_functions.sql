-- 0003_harden_functions.sql — utišení security advisorů na SECURITY DEFINER
-- funkcích (get_advisors WARN: anon i authenticated mohou volat SECURITY DEFINER
-- funkce přes /rest/v1/rpc). Nízká závažnost, ale utišíme je defense-in-depth.
--
-- 1) artist_owned_by_current_user → SECURITY INVOKER. Funkce jen čte public.artists
--    (veřejný SELECT policy `using true`), takže INVOKER funguje a odpadne lint
--    "SECURITY DEFINER executable" (anon i authenticated). RLS write policy dále
--    volá funkci jako authenticated — PUBLIC EXECUTE zůstává, takže stačí.
-- 2) handle_new_user zůstává SECURITY DEFINER (trigger vkládá řádek do artists
--    jako vlastník — jinak by nový uživatel neměl právo insert). Přímé volání
--    přes RPC nechceme: revokujeme EXECUTE z PUBLIC. Trigger běží pod vlastníkem
--    funkce, ne vyžaduje EXECUTE pro anon/authenticated, takže trigger dál funguje.

alter function public.artist_owned_by_current_user(uuid) security invoker;

revoke execute on function public.handle_new_user() from public;
grant  execute on function public.handle_new_user() to service_role;
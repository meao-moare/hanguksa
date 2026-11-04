# 한국사 지도 앱 만들기: src 폴더의 조각을 합쳐 ../index.html(사이트용)과 app.html(클로드 아티팩트용)을 만든다
set -e
cd "$(dirname "$0")"
{ cat a_head.html; echo '<script src="https://cdn.jsdelivr.net/npm/flubber@0.4.2/build/flubber.min.js"></script>'; echo '<script>'; cat land.js b_data.js d_reign.js e_extra.js g_gloss.js k_more.js c_app.js f_ov.js h_audio.js i_world.js j_tree.js l_search.js m_king.js n_hz.js p_life.js o_cont.js q_peg.js r_trpage.js s_menu.js t_hanja.js u_alias.js; echo '</script>'; } > app.html
{ echo '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>한국사 지도</title><style>[hidden]{display:none!important}body{margin:0}</style></head><body>'; cat app.html; cat fb_module.html; echo '</body></html>'; } > ../index.html
echo "built"

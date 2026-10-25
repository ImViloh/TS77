-- [OPEN77-TS] generated for catalogue 2.50.0+op77.148
resource "player_notes"
version "1.0.0"
auto_start true

client_script "dist/client/main.lua"
server_script "dist/server/main.lua"

permissions {
    "http.request",
    "http.serve",
    "network.events",
}

web_file "web/assets/index-Bfyf_gBU.js"
web_file "web/assets/index-BsJ9NAsl.css"
web_file "web/index.html"

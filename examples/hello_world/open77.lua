-- [OPEN77-TS] generated for catalogue 2.50.0+op77.148
resource "hello_world"
version "1.0.0"
auto_start true

client_script "dist/client/main.lua"
server_script "dist/server/main.lua"

permissions {
    "network.events",
}

web_file "web/assets/index-361vZHL5.css"
web_file "web/assets/index-D3ChJgwl.js"
web_file "web/index.html"

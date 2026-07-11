package com.hotfox.store_api.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class HomeController {
    @RequestMapping("/")
    public fun index(): String {
        return "index.html"
    }
}
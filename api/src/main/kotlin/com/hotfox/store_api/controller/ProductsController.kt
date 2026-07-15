package com.hotfox.store_api.controller

import com.hotfox.store_api.dto.ProductImageDto
import com.hotfox.store_api.model.Product
import com.hotfox.store_api.service.ProductService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@CrossOrigin(originPatterns = ["http://localhost:*", "http://127.0.0.1:*"], allowCredentials = "true")
@RequestMapping("/products")
class ProductsController(private val productService: ProductService) {
    @GetMapping
    fun getAllProducts(): List<Product> = productService.getAllProducts()

    @GetMapping("/{productId}")
    fun getProduct(@PathVariable productId: String): Product? = productService.getProduct(productId)

    @GetMapping("/{productId}/images")
    fun getProductImages(@PathVariable productId: String): List<ProductImageDto> =
        productService.getProductImages(productId.toInt())

    @GetMapping("/featured")
    fun getFeaturedProducts(): List<Product> =
        productService.getAllFeaturedProducts()

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createProduct(
        @RequestParam name: String,
        @RequestParam description: String,
        @RequestParam price: Double,
        @RequestParam color: String,
        @RequestParam size: String,
        @RequestPart("images", required = false) images: Array<MultipartFile>?,
    ): Product = productService.createProduct(
        name = name,
        description = description,
        price = price,
        color = color,
        size = size,
        images = images.orEmpty().toList(),
    )

    @DeleteMapping("/{productId}")
    fun deleteProduct(@PathVariable productId: String): Boolean =
        productService.deleteProduct(productId.toInt())
}
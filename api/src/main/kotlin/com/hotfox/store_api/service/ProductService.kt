package com.hotfox.store_api.service

import com.hotfox.store_api.dto.ProductImageDto
import com.hotfox.store_api.model.Product
import com.hotfox.store_api.model.ProductImage
import com.hotfox.store_api.model.ProductSection
import com.hotfox.store_api.repository.ProductImageRepository
import com.hotfox.store_api.repository.ProductsRepository
import jakarta.transaction.Transactional
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.util.Base64

@Service
class ProductService(
    private val productsRepository: ProductsRepository,
    private val productImageRepository: ProductImageRepository,
) {
    @Transactional
    fun createProduct(
        name: String,
        description: String,
        price: Double,
        color: String,
        size: String,
        images: List<MultipartFile>,
    ): Product {
        val product = Product().apply {
            this.name = name
            this.description = description
            this.price = price
            this.color = color
            this.size = size
        }

        val savedProduct = productsRepository.createProduct(product)

        images.forEachIndexed { index, image ->
            val imageBytes = image.bytes
            val imageEntity = ProductImage().apply {
                this.product = savedProduct
                imageName = image.originalFilename ?: "image-${index + 1}"
                imageData = imageBytes
            }
            productImageRepository.createImage(imageEntity)
        }

        return savedProduct
    }

    fun getAllProducts(): List<Product> = productsRepository.getAllProducts()

    fun getProduct(productId: String): Product? = productsRepository.getProduct(productId)

    fun getProductImages(productId: Int): List<ProductImageDto> =
        productImageRepository.findByProductId(productId).map { image ->
            ProductImageDto(
                imageId = image.imageId,
                imageName = image.imageName,
                imageData = Base64.getEncoder().encodeToString(image.imageData),
            )
        }
    fun getAllFeaturedProducts(): List<Product> {
        return productsRepository.getAllFeatured()
    }

    @Transactional
    fun deleteProduct(productId: Int): Boolean {
        productImageRepository.deleteByProductId(productId)
        return productsRepository.deleteProduct(productId)
    }
}
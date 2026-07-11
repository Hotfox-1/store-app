package com.hotfox.store_api.repository

import com.hotfox.store_api.model.ProductImage
import jakarta.persistence.EntityManager
import jakarta.transaction.Transactional
import org.springframework.stereotype.Repository

@Repository
class ProductImageRepository(private val entityManager: EntityManager) {
    fun findByProductId(productId: Int): List<ProductImage> {
        val query = entityManager.criteriaBuilder.createQuery(ProductImage::class.java)
        val root = query.from(ProductImage::class.java)
        query.select(root).where(
            entityManager.criteriaBuilder.equal(root.get<Int>("product").get<Int>("productId"), productId)
        )
        return entityManager.createQuery(query).resultList
    }

    @Transactional
    fun createImage(image: ProductImage): ProductImage {
        entityManager.persist(image)
        entityManager.flush()
        return image
    }

    @Transactional
    fun deleteByProductId(productId: Int) {
        val images = findByProductId(productId)
        images.forEach { entityManager.remove(it) }
    }
}

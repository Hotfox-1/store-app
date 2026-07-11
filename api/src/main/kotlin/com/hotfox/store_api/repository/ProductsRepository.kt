package com.hotfox.store_api.repository

import com.hotfox.store_api.model.Product
import com.hotfox.store_api.model.ProductSection
import jakarta.persistence.EntityManager
import jakarta.transaction.Transactional
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Repository

@Repository
class ProductsRepository(private val entityManager: EntityManager) {
    fun getAllProducts(): List<Product> {
        val query = entityManager.criteriaBuilder.createQuery(Product::class.java)
        query.select(query.from(Product::class.java))
        return entityManager.createQuery(query).resultList
    }

    fun getProduct(productId: String): Product? {
        return entityManager.find(Product::class.java, productId.toInt())
    }

    fun getAllFeatured(): List<Product> {
        return entityManager
            .createQuery("SELECT p FROM Product p JOIN p.sections s WHERE s.sectionId = :sectionId", Product::class.java)
            .resultList
    }

    @Transactional
    fun createProduct(product: Product): Product {
        entityManager.persist(product)
        entityManager.flush()
        return product
    }

    @Transactional
    fun updateProduct(product: Product): Product {
        return entityManager.merge(product)
    }

    @Transactional
    fun deleteProduct(productId: Int): Boolean {
        val product = entityManager.find(Product::class.java, productId)
        if (product != null) {
            entityManager.remove(product)
            return true
        }
        return false
    }
}
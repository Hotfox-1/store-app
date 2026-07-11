package com.hotfox.store_api.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = "images")
class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var imageId: Int = 0

    @Column(name = "image_data", nullable = false)
    var imageData: ByteArray = byteArrayOf()

    @Column(name = "image_name")
    var imageName: String = ""

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    lateinit var product: Product
}

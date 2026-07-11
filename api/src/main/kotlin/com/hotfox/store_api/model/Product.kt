package com.hotfox.store_api.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.JoinTable
import jakarta.persistence.ManyToMany
import jakarta.persistence.Table


@Entity
@Table(name = "products")
open class Product() {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var productId: Int = 0

    @Column(nullable = false)
    var name: String = ""

    @Column
    var description: String? = null

    @Column(nullable = false)
    var price: Double = 0.0

    @Column
    var color: String = ""

    @Column
    var size: String = ""

    @Column
    var ownerId: Int = 0

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "featured",
        joinColumns = [JoinColumn(name = "product_id")],
        inverseJoinColumns = [JoinColumn(name = "section_id")],
    )
    var sections: MutableSet<ProductSection> = mutableSetOf()
}
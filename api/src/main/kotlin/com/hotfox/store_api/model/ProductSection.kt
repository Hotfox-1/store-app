package com.hotfox.store_api.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.ManyToMany
import jakarta.persistence.Table

@Entity
@Table(name = "sections")
open class ProductSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var sectionId: Int = 0;

    @Column(name = "section_name", nullable = false)
    var sectionName: String = "";

    @ManyToMany(mappedBy = "sections", fetch = FetchType.LAZY)
    var products: MutableSet<Product> = mutableSetOf()
}
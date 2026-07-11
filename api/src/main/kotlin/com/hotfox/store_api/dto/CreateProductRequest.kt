package com.hotfox.store_api.dto

data class CreateProductRequest(
    val name: String,
    val description: String?,
    val price: Double,
    val color: String,
    val size: String,
    val imageNames: List<String> = emptyList(),
    val imageData: List<String> = emptyList(),
)

plugins {
    id("com.android.application")
    id("kotlin-android")
    id("com.google.gms.google-services") 
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.example.eco_connect"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = "27.0.12077973" // Update to the required NDK version


    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget =  "11"
        }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.example.eco_connect"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        versionCode = flutter.versionCode
        versionName = flutter.versionName
        minSdkVersion (23)
        targetSdkVersion (33)

    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
             "proguard-rules.pro"
             )
            signingConfig = signingConfigs.getByName("debug")
        }
        debug {
            isMinifyEnabled = false // Keep debug builds unshrunk
            isShrinkResources = false
        }
    }
}

flutter {
    source = "../.."
}

dependencies {
    implementation("com.google.firebase:firebase-bom:33.13.0") // Firebase BOM
    implementation("com.google.firebase:firebase-analytics-ktx") // Example Firebase dependency
    implementation("androidx.core:core-ktx:1.10.1")
}
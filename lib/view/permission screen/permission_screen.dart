import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:eco_connect/res/routes/routes.dart';
import 'package:eco_connect/view model/services/permission_services.dart';
import 'package:eco_connect/view/permission screen/components/permission_body.dart';

class PermissionScreen extends StatefulWidget {
  const PermissionScreen({super.key});

  @override
  State<PermissionScreen> createState() => _PermissionScreenState();
}

class _PermissionScreenState extends State<PermissionScreen> {
  bool _checking = true;
  Map<String, bool> _permissionStatus = {
    "NFC": false,
    "Camera": false,
    "Location": false,
    "Storage": false,
  };

  @override
  void initState() {
    super.initState();
    _checkPermissions();
  }

  Future<void> _checkPermissions() async {
    final camera = await PermissionService.isCameraGranted();
    final location = await PermissionService.isLocationGranted();
    final storage = await PermissionService.isStorageGranted();

    setState(() {
      _permissionStatus = {
        "Camera": camera,
        "Location": location,
        "Storage": storage,
      };
      _checking = false;
    });

    if (camera && location && storage) {
      Get.offAllNamed(Routes.homePage);
    }
  }

  Future<void> _requestPermissions() async {
    bool allGranted = await PermissionService.requestAllPermissions();
    await _checkPermissions();
    if (allGranted) {
      Get.offAllNamed(Routes.homePage);
    } else {
      Get.snackbar(
        "Permissions Required",
        "Please allow all permissions to continue.",
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.red.withOpacity(0.7),
        colorText: Colors.white,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    if (_checking) {
      return Scaffold(
        backgroundColor: theme.scaffoldBackgroundColor,
        body: const Center(child: CircularProgressIndicator()),
      );
    }
    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: PermissionBody(
            onRequest: _requestPermissions,
            permissionStatus: _permissionStatus,
          ),
        ),
      ),
    );
  }
}

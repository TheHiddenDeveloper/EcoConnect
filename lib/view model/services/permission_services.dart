import 'package:permission_handler/permission_handler.dart';

class PermissionService {
  static final List<Permission> requiredPermissions = [
    Permission.camera,
    Permission.location,
    Permission.storage,
    // Internet and network permissions are not runtime permissions
  ];

  /// Checks if all required permissions are granted.
  static Future<bool> areAllPermissionsGranted() async {
    for (var perm in requiredPermissions) {
      if (!await perm.isGranted) {
        return false;
      }
    }
    return true;
  }

  /// Requests all required permissions.
  static Future<bool> requestAllPermissions() async {
    Map<Permission, PermissionStatus> statuses =
        await requiredPermissions.request();
    return statuses.values.every((status) => status.isGranted);
  }

  static Future<bool> isCameraGranted() async {
    final status = await Permission.camera.status;
    return status.isGranted;
  }

  static Future<bool> isLocationGranted() async {
    final status = await Permission.location.status;
    return status.isGranted;
  }

  static Future<bool> isStorageGranted() async {
    final status = await Permission.storage.status;
    return status.isGranted;
  }
}

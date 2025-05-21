import 'package:get/get.dart';
import 'package:eco_connect/res/routes/routes.dart';

class NavigationService {
  static void toSignUp() => Get.offAllNamed(Routes.signUpScreen);
  static void toLogin() => Get.offAllNamed(Routes.signInScreen);
  static void toPermission() => Get.offAllNamed(Routes.permissionScreen);
  static void toHome() => Get.offAllNamed(Routes.homePage);

  static void back() => Get.back();
  static void toNamed(String route) => Get.toNamed(route);
}

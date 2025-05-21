import 'package:get/get.dart';
import 'package:eco_connect/res/routes/routes.dart';
import 'package:eco_connect/view/home%20page/home_page.dart';
import 'package:eco_connect/view/sign%20in/sign_in.dart';
import 'package:eco_connect/view/sign%20up/sign_up.dart';
import 'package:eco_connect/view/splash/splash_screen.dart';
import 'package:eco_connect/view/permission%20screen/permission_screen.dart';

class AppRoutes {
  static List<GetPage> routes() {
    return [
      GetPage(name: Routes.splashScreen, page: () => const SplashScreen()),
      GetPage(name: Routes.signUpScreen, page: () => const SignUp()),
      GetPage(name: Routes.signInScreen, page: () => const SignIn()),
      GetPage(name: Routes.homePage, page: () => HomePage()),
      GetPage(
        name: Routes.permissionScreen,
        page: () => const PermissionScreen(),
      ),
    ];
  }
}

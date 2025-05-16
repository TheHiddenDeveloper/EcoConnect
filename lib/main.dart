import 'package:eco_connect/res/routes/routes.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:eco_connect/res/routes/app_routes.dart';
import 'package:eco_connect/view model/theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp(); // Initialize Firebase
    runApp(const MyApp());
  } catch (e) {
    print(
      'Firebase initialization error: $e',
    ); // Debugging Firebase initialization
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme(context),
      darkTheme: AppTheme.darkTheme(context),
      themeMode: ThemeMode.system, // Follows system theme
      initialRoute: Routes.splashScreen, // Set the initial route
      getPages: AppRoutes.routes(),
    );
  }
}

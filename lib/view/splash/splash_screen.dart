import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../../view model/services/splash_services.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});
  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    SplashServices.checkLogin();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: Center(
        child: Container(
          alignment: Alignment.center,
          height: 150,
          width: 150,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(100),
            color: theme.colorScheme.primary,
            boxShadow: [
              BoxShadow(
                color: theme.colorScheme.secondary.withOpacity(0.2),
                offset: const Offset(1, 1),
              ),
              BoxShadow(
                color: theme.colorScheme.secondary.withOpacity(0.2),
                offset: const Offset(-1, -1),
              ),
            ],
          ),
          child: Icon(
            FontAwesomeIcons.candyCane,
            color: theme.colorScheme.onPrimary,
            size: 50,
          ),
        ),
      ),
    );
  }
}

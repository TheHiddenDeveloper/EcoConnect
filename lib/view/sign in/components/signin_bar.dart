import 'package:flutter/material.dart';
import 'package:eco_connect/view/common widgets/back_button.dart';

class SignInBar extends StatelessWidget {
  const SignInBar({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Row(
      children: [
        const CustomBackButton(),
        const SizedBox(width: 20),
        Text(
          'Sign in',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            fontSize: 30,
            fontWeight: FontWeight.bold,
            color: isDark ? Colors.white : Colors.black,
          ),
        ),
      ],
    );
  }
}

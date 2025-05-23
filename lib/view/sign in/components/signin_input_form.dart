import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:eco_connect/view%20model/controller/signin_controller.dart';

import '../../sign up/components/text_field.dart';

class SignInForm extends StatelessWidget {
  SignInForm({super.key});
  final controller = Get.put(SignInController());
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 40),
        Text(
          '  Email',
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
            color: Theme.of(context).colorScheme.onSurface,
            fontWeight: FontWeight.w400,
            fontSize: 17,
          ),
        ),
        const SizedBox(height: 10),
        Obx(
          () => InputField(
            onTap: () => controller.onFocusEmail(),
            focus: controller.emailFocus.value,
            hint: "tim@gmail.com",
            controller: controller.email.value,
            correct: controller.correctEmail.value,
            onChange: controller.validateEmail,
          ),
        ),
        const SizedBox(height: 20),
        Text(
          '  Password',
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
            color: Theme.of(context).colorScheme.onSurface,
            fontWeight: FontWeight.w400,
            fontSize: 17,
          ),
        ),
        const SizedBox(height: 10),
        Obx(
          () => InputField(
            onTap: () => controller.onFocusPassword(),
            focus: controller.passwordFocus.value,
            hint: "Pick a strong password",
            controller: controller.password.value,
            hideText: controller.showPassword.value,
            onChange: () {},
            showPass: () => controller.showPassword.toggle(),
          ),
        ),
        const SizedBox(height: 40),
      ],
    );
  }
}

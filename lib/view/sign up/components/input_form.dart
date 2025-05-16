import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../view model/controller/signup_controller.dart';
import 'text_field.dart';

class InputForm extends StatelessWidget {
  InputForm({super.key});
  final controller = Get.put(SignupController());
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 40),
        Text(
          '  Name',
          style: theme.textTheme.bodyLarge?.copyWith(
            color: theme.colorScheme.onSurface,
            fontWeight: FontWeight.w400,
            fontSize: 17,
          ),
        ),
        const SizedBox(height: 10),
        Obx(
          () => InputField(
            onTap: () => controller.onFocusName(),
            focus: controller.nameFocus.value,
            hint: "Enter Your Name",
            controller: controller.name.value,
            correct: controller.correctName.value,
            onChange: controller.validateName,
          ),
        ),
        const SizedBox(height: 20),
        Text(
          '  Email',
          style: theme.textTheme.bodyLarge?.copyWith(
            color: theme.colorScheme.onSurface,
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
          style: theme.textTheme.bodyLarge?.copyWith(
            color: theme.colorScheme.onSurface,
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

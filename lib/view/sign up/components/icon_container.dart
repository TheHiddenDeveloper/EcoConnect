import 'package:flutter/material.dart';

class IconContainer extends StatelessWidget {
  final Widget widget;
  const IconContainer({super.key, required this.widget});
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.sizeOf(context);
    final theme = Theme.of(context);
    return Container(
      height: 60,
      width: size.width * 0.43,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: theme.colorScheme.primary,
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: theme.colorScheme.onPrimary.withOpacity(0.2),
            offset: const Offset(1, 0),
          ),
          BoxShadow(
            color: theme.colorScheme.onPrimary.withOpacity(0.2),
            offset: const Offset(0, 1),
          ),
          BoxShadow(
            color: theme.colorScheme.onPrimary.withOpacity(0.2),
            offset: const Offset(-1, 0),
          ),
          BoxShadow(
            color: theme.colorScheme.onPrimary.withOpacity(0.2),
            offset: const Offset(0, -1),
          ),
        ],
      ),
      child: widget,
    );
  }
}

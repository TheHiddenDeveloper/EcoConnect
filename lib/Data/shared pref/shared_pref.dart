import 'package:shared_preferences/shared_preferences.dart';

class UserPref {
  static Future<void> setUser(String name, String email, String uid) async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    await pref.setString('NAME', name);
    await pref.setString('EMAIL', email);
    await pref.setString('UID', uid);
  }

  static Future<Map<String, String>> getUser() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    return {
      'NAME': pref.getString('NAME') ?? '',
      'EMAIL': pref.getString('EMAIL') ?? '',
      'UID': pref.getString('UID') ?? '',
    };
  }

  static Future<void> removeUser() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    await pref.remove('NAME');
    await pref.remove('EMAIL');
    await pref.remove('UID');
  }
}
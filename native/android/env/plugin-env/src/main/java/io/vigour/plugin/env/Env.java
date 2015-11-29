package io.vigour.plugin.env;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.telephony.TelephonyManager;

import java.util.Locale;

/**
 * Created by michielvanliempt on 29/09/15.
 */
public class Env {
    private String bundleId;
    private String version;
    private int versionCode;

    private String os;
    private int osVersion;
    private String model;

    private final String language;
    private final String country;
    private final String languageRegion;

    public Env(Context context) {
        os = "Android";
        osVersion = Build.VERSION.SDK_INT;
        ApplicationInfo applicationInfo = context.getApplicationInfo();
        bundleId = applicationInfo.packageName;
        model = Build.MODEL;
        languageRegion = Locale.getDefault().getCountry();
        language = Locale.getDefault().getLanguage();
        country = getUserCountry(context);
        String name = context.getPackageName();
        try {
            PackageInfo packageInfo = context.getPackageManager().getPackageInfo(name, 0);
            version = packageInfo.versionName;
            versionCode = packageInfo.versionCode;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static String getUserCountry(Context context) {
        try {
            final TelephonyManager tm = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            final String simCountry = tm.getSimCountryIso();
            if (simCountry != null && simCountry.length() == 2) { // SIM country code is available
                return simCountry.toLowerCase(Locale.US);
            }
            else if (tm.getPhoneType() != TelephonyManager.PHONE_TYPE_CDMA) { // device is not 3G (would be unreliable)
                String networkCountry = tm.getNetworkCountryIso();
                if (networkCountry != null && networkCountry.length() == 2) { // network country code is available
                    return networkCountry.toLowerCase(Locale.US);
                }
            }
        }
        catch (Exception e) { }
        return null;
    }

    public int getVersionCode() {
        return versionCode;
    }

    public String getBundleId() {
        return bundleId;
    }

    public String getCountry() {
        return country;
    }

    public String getLanguage() {
        return language;
    }

    public String getLanguageRegion() {
        return languageRegion;
    }

    public String getModel() {
        return model;
    }

    public String getOs() {
        return os;
    }

    public int getOsVersion() {
        return osVersion;
    }

    public String getVersion() {
        return version;
    }
}

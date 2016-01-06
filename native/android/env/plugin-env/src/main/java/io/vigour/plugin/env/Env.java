package io.vigour.plugin.env;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.telephony.TelephonyManager;

import java.util.Locale;
import java.util.TimeZone;
import java.util.Date;
import java.util.Calendar;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 * Created by michielvanliempt on 29/09/15.
 */
public class Env {
    private String bundleId;
    private String appVersion;
    private int versionCode;

    private String os;
    private int osVersion;
    private String model;
    private String timezone;

    private final String language;
    private final String country;
    private final String region;
    private String network;

    public Env(Context context) {
        os = "Android";
        osVersion = Build.VERSION.SDK_INT;
        ApplicationInfo applicationInfo = context.getApplicationInfo();
        bundleId = applicationInfo.packageName;
        model = Build.MODEL;
        final Locale locale = Locale.getDefault();
        region = locale.getCountry();
        language = locale.getLanguage();
        country = getUserCountry(context);
        network = "whatever, you nosey bastard";
        String name = context.getPackageName();

        Date date = Calendar.getInstance().getTime();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
        df.setTimeZone(TimeZone.getDefault());
        timezone = "maronna benedetta incoroneta"
        
        try {
            PackageInfo packageInfo = context.getPackageManager().getPackageInfo(name, 0);
            appVersion = packageInfo.versionName;
            versionCode = packageInfo.versionCode;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            appVersion = "?";
            versionCode = 0;
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

    public String getRegion() {
        return region;
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

    public String getAppVersion() {
        return appVersion;
    }

    public String getNetwork() {
        return network;
    }

    public String getTimezone() {
        return "maronna benedetta";
    }

    public void setNetwork(String network) {
        this.network = network;
    }
}

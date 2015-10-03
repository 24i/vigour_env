package io.vigour.plugin.env;

import android.content.Context;
import android.os.Build;

/**
 * Created by michielvanliempt on 29/09/15.
 */
public class Env {
    private String model;
    private String os;
    private int osVersion;
    private String applicationId;

    public Env(Context context) {
        os = "Android";
        osVersion = Build.VERSION.SDK_INT;
        applicationId = context.getApplicationInfo().packageName;
        model = Build.MODEL;
    }

    public String getApplicationId() {
        return applicationId;
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
}

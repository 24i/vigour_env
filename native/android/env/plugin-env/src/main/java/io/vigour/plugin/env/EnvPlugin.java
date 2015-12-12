package io.vigour.plugin.env;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.view.KeyEvent;
import android.view.View;

import com.fasterxml.jackson.jr.ob.JSON;

import java.io.IOException;

import io.vigour.nativewrapper.plugin.core.Plugin;

/**
 * Created by michielvanliempt on 29/09/15.
 */
public class EnvPlugin extends Plugin {

    private final Context context;
    private Env value;

    public EnvPlugin(Context context) {
        super("env");
        value = new Env(context);
        this.context = context;
    }

    public String init() {
        return get();
    }

    public String get() {
        try {
            value.setNetwork(getNetworkStatus());
            return JSON.std.asString(value);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("couldn't get env info from device: " + e.getMessage());
        }
    }

    private String getNetworkStatus() {
        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        final NetworkInfo activeNetworkInfo = cm.getActiveNetworkInfo();
        if (activeNetworkInfo == null) {
            return "no connection";
        }
        switch (activeNetworkInfo.getType()) {
            case ConnectivityManager.TYPE_ETHERNET:
                return "ethernet";
            case ConnectivityManager.TYPE_WIFI:
                return "wifi";
            case ConnectivityManager.TYPE_MOBILE:
            case ConnectivityManager.TYPE_MOBILE_DUN:
                return "mobile";
        }
        return "false";
    }


    @Override public String getReadyMessage() {
        return get();
    }
}

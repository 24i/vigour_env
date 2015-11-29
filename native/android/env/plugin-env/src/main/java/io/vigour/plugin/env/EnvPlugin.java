package io.vigour.plugin.env;

import android.content.Context;

import com.fasterxml.jackson.jr.ob.JSON;

import java.io.IOException;

import io.vigour.nativewrapper.plugin.core.Plugin;

/**
 * Created by michielvanliempt on 29/09/15.
 */
public class EnvPlugin extends Plugin {

    private Env value;

    public EnvPlugin(Context context) {
        super("env");
        value = new Env(context);
    }

    public String get() {
        try {
            return JSON.std.asString(value);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("couldn't get env info from device: " + e.getMessage());
        }
    }

    @Override public String getReadyMessage() {
        return get();
    }
}

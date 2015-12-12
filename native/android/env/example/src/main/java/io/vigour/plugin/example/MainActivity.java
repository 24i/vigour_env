package io.vigour.plugin.example;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.widget.TextView;

import io.vigour.nativewrapper.plugin.core.BridgeEvents;
import io.vigour.plugin.env.EnvPlugin;

public class MainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final TextView ouptup = (TextView) findViewById(R.id.output);
        EnvPlugin plugin = new EnvPlugin(this);
        plugin.setEventInterface(new BridgeEvents() {
            @Override public void receive(String event, String data, String pluginId) {
                ouptup.setText(String.format("event %s %s", event, data));
            }
        });

        String text = plugin.get();
        Log.d("env", text);
        ouptup.setText(text);
    }
}

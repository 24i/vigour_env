package io.vigour.plugin.example;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.widget.TextView;

import io.vigour.plugin.env.EnvPlugin;

public class MainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        EnvPlugin plugin = new EnvPlugin(this);

        TextView ouptup = (TextView) findViewById(R.id.output);
        String text = plugin.get();
        Log.d("env", text);
        ouptup.setText(text);
    }
}

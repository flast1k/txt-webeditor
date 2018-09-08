package home.flast1k.system.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;
import java.util.SortedMap;

@RestController
public class CharsetController {
    @GetMapping("/charsets")
    public @ResponseBody SortedMap<String, Charset> getAvailableCharsets() {
        return Charset.availableCharsets();
    }
}

package home.flast1k.system.helper;

import org.mozilla.universalchardet.UniversalDetector;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;

public class Utilities {
    public static Charset detectCharset(InputStream inputStream) throws IOException {
        UniversalDetector detector = new UniversalDetector();
        byte[] buf = new byte[4096];
        int nread;
        while ((nread = inputStream.read(buf)) > 0 && !detector.isDone()) {
            detector.handleData(buf, 0, nread);
        }
        detector.dataEnd();
        String charsetStr = detector.getDetectedCharset();
        if (charsetStr != null) {
            return Charset.forName(charsetStr);
        }
        return null;
    }
}

package home.flast1k.system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "File not found")
public class FileNotFoundException extends RuntimeException {
    public FileNotFoundException() {
        super();
    }
}

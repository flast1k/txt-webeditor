package home.flast1k.system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "Inappropriate file format")
public class FileFormatException extends RuntimeException {
    public FileFormatException() {
        super();
    }
}

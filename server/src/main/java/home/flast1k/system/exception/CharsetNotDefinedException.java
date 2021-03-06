package home.flast1k.system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY, reason = "Charset not defined")
public class CharsetNotDefinedException extends Exception {
    public CharsetNotDefinedException() {
        super();
    }
}

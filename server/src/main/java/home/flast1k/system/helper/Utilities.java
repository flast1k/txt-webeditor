package home.flast1k.system.helper;

import home.flast1k.system.model.FileInfo;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

public class Utilities {
    private static final String APPLICATION_OCTET_STREAM = "application/octet-stream";

    public static ResponseEntity<Resource> ConvertFileInfoToResourceEntity(FileInfo fileInfo) {
        InputStream stream = new ByteArrayInputStream(fileInfo.getBinarySource());
        Resource resource = new InputStreamResource(stream);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(APPLICATION_OCTET_STREAM))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileInfo.getName() + "\"")
                .body(resource);
    }
}

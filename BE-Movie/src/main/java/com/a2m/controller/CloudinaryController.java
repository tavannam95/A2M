package com.a2m.controller;

import com.a2m.model.response.DataResponse;
import com.a2m.service.CloudinaryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/image")
public class CloudinaryController {
    private final CloudinaryService cloudinaryService;

    public CloudinaryController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("upload")
    public ResponseEntity<?> upload(@RequestParam("files") MultipartFile[] files) throws IOException {
        return new ResponseEntity<>(cloudinaryService.upload(files), HttpStatus.OK);
    }

    @DeleteMapping("/{publicId}")
    public DataResponse<?> delete(@PathVariable("publicId") String publicId){
        Map<String,Object> response = new HashMap<>();
        try {
            cloudinaryService.delete(publicId);
            response.put("message","Xóa ảnh thành công");
        }catch (Exception e){
            e.printStackTrace();
            response.put("error", e.getMessage());
            response.put("message", "Lỗi xóa ảnh");
            return new DataResponse<>(false,"Error",response);
        }
        return new DataResponse<>(true,"Success",response);
    }
}

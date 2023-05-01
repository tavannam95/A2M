package com.a2m.service.impl;

import com.a2m.service.CloudinaryService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    @Override
    public List<String> upload(MultipartFile[] files) throws IOException {
        List<String> listImageUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            listImageUrls.add(save(file));
        }
        return listImageUrls;
    }

    @Override
    public void delete(String publicId) throws IOException {
        Map<String,String> param = new HashMap<>();
        param.put("invalidate", "true");
        cloudinary.uploader().destroy(publicId,param);
    }

    private String save(MultipartFile file) throws IOException{
        Map map = this.cloudinary
                    .uploader()
                    .upload(file.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
        return map.get("secure_url").toString();
    }
}

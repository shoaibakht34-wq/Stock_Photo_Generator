package com.ai.spring_ai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ai.spring_ai.services.ChatService;
import com.ai.spring_ai.services.ImageService;

@RestController
public class GenAiController {
   private final  ChatService chatService;
   private final  ImageService imageService;
    public GenAiController(ImageService imageService, ChatService chatService) {
    
    this.imageService = imageService;
    this.chatService = chatService;
}




    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
     // try{
         return chatService.getResponse(prompt);
      // }catch(Exception e){
      //  e.printStackTrace();
     //   return "ERROR:"+e.getMessage();
      // }
    }
    @GetMapping("ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt){
        return chatService.getResponseOptions(prompt);
    }
    @GetMapping("/generate-image")
public ResponseEntity<byte[]> generateImage(@RequestParam String prompt) {

    byte[] image = imageService.generateImage(prompt);

    return ResponseEntity.ok()
            .header("Content-Type", "image/png")
            .body(image);
}
}

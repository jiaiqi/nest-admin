import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
    async captche(size = 4) {
        const captcha = svgCaptcha.create({  //可配置返回的图片信息
            size, //生成几个验证码
            fontSize: 50, //文字大小
            noise: 1,// 干扰线条的数量
            width: 100,  //宽度
            height: 34,  //高度
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#1f94ff',  //背景颜色
        });

        console.log('图形验证码：',captcha.text);
        
        return captcha;
    }
}
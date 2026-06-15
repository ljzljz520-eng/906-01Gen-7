import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-lacquer-700 text-rice-100 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-song text-xl font-bold text-white">手艺馆</span>
            </div>
            <p className="text-rice-300 text-sm leading-relaxed mb-4 max-w-md">
              专注于传统手工艺的在线学习平台，连接匠人与爱好者，
              让竹编、漆器、剪纸、扎染等非遗技艺走进现代生活。
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-lacquer-600 flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-song text-white font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm text-rice-300">
              <li>
                <Link to="/" className="hover:text-primary-300 transition-colors">首页</Link>
              </li>
              <li>
                <Link to="/tutorials" className="hover:text-primary-300 transition-colors">教程中心</Link>
              </li>
              <li>
                <Link to="/topics" className="hover:text-primary-300 transition-colors">专题路径</Link>
              </li>
              <li>
                <Link to="/publish" className="hover:text-primary-300 transition-colors">发布教程</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-song text-white font-semibold mb-4">联系我们</h4>
            <ul className="space-y-3 text-sm text-rice-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@shouyiguan.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>400-888-9999</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>北京市朝阳区非遗文化中心</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-lacquer-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-rice-400">
            <p>© 2024 手艺馆 版权所有 | 京ICP备12345678号</p>
            <p className="text-center md:text-right">
              转载教程请保留来源和作者信息，商业使用请联系授权
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

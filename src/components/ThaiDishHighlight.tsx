import React, { useState } from 'react';
import { Star, Clock, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SocialShare from '@/components/SocialShare';

const ThaiDishHighlight = () => {
  const [activeTab, setActiveTab] = useState('tom-yum');

  const dishes = {
    'tom-yum': {
      name: 'Tom Yum Goong',
      vietnamese: 'Tôm Hùm Sốt Chua Cay',
      description: 'Món súp đặc trưng của Thái Lan với hương vị chua cay đậm đà, tôm hùm tươi ngon, nấm và các loại thảo mộc đặc trưng.',
      price: '250.000đ',
      rating: 4.9,
      time: '20 phút',
      spicy: 3,
      keywords: ['tôm hùm', 'súp chua cay', 'đặc sản thái', 'tom yum goong']
    },
    'pad-thai': {
      name: 'Pad Thai',
      vietnamese: 'Mì Xào Thái',
      description: 'Món mì xào kinh điển với mì gạo, tôm, đậu phộng, giá đỗ và nước sốt đặc trưng tạo nên hương vị cân bằng hoàn hảo.',
      price: '120.000đ',
      rating: 4.8,
      time: '15 phút',
      spicy: 1,
      keywords: ['mì xào thái', 'pad thai', 'món kinh điển', 'đậu phộng']
    },
    'som-tam': {
      name: 'Som Tam',
      vietnamese: 'Gỏi Đu Đủ Xanh',
      description: 'Salad đu đủ xanh trộn với cà chua, đậu phộng, ớt và nước mắm cá tạo nên món ăn thanh mát, đậm đà hương vị Thái.',
      price: '80.000đ',
      rating: 4.7,
      time: '10 phút',
      spicy: 4,
      keywords: ['gỏi đu đủ', 'salad thái', 'som tam', 'thanh mát']
    },
    'mango-sticky-rice': {
      name: 'Mango Sticky Rice',
      vietnamese: 'Xoài Dẻo',
      description: 'Món tráng miệng ngọt ngào với xoài chín ngọt kết hợp cùng xôi nếp dừa thơm béo, dừa tươi nạo sợi.',
      price: '60.000đ',
      rating: 4.9,
      time: '5 phút',
      spicy: 0,
      keywords: ['tráng miệng thái', 'xoài dẻo', 'mango sticky rice', 'ngọt ngào']
    }
  };

  const currentDish = dishes[activeTab as keyof typeof dishes];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const renderSpicyLevel = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`h-2 w-2 rounded-full ${i < level ? 'bg-red-500' : 'bg-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đặc Sắc <span className="text-red-600">Ẩm Thực Thái</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các món ăn đặc sắc từ Thái Lan với hương vị đích thực, được chế biến bởi đầu bếp chuyên nghiệp
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(dishes).map(([key, dish]) => (
            <Button
              key={key}
              variant={activeTab === key ? 'default' : 'outline'}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === key 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'hover:bg-red-50 hover:text-red-600'
              }`}
            >
              {dish.name}
            </Button>
          ))}
        </div>

        {/* Dish Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentDish.name}</h3>
                    <p className="text-lg text-red-600 font-medium">{currentDish.vietnamese}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">{currentDish.price}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentDish.description}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentDish.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      {renderStars(currentDish.rating)}
                    </div>
                    <p className="text-sm text-gray-600">Đánh giá</p>
                    <p className="font-semibold">{currentDish.rating}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-red-600" />
                    <p className="text-sm text-gray-600">Thời gian</p>
                    <p className="font-semibold">{currentDish.time}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center gap-1 mb-1">
                      {renderSpicyLevel(currentDish.spicy)}
                    </div>
                    <p className="text-sm text-gray-600">Độ cay</p>
                    <p className="font-semibold">{currentDish.spicy}/5</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                    Đặt món ngay
                  </Button>
                  <SocialShare 
                    title={`${currentDish.name} - Mix Food Đà Nẵng`}
                    description={`${currentDish.vietnamese} - ${currentDish.description}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO Info Box */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Tại sao chọn Mix Food?
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Nguyên liệu tươi ngon nhập khẩu từ Thái Lan</li>
                  <li>• Đầu bếp chuyên nghiệp với 10+ năm kinh nghiệm</li>
                  <li>• Hương vị chuẩn vị Thái Lan</li>
                  <li>• Không gian sang trọng, hiện đại</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-red-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">🍜</span>
                </div>
                <p className="text-gray-600 font-medium">Hình ảnh {currentDish.name}</p>
                <p className="text-sm text-gray-500">Chụp tại Mix Food Đà Nẵng</p>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              Món đặc sắc
            </div>
          </div>
        </div>

        {/* Bottom SEO Content */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            <strong>Keywords:</strong> {currentDish.keywords.join(', ')}, ẩm thực thái lan, nhà hàng thái lan đà nẵng, 
            món ăn thái, {currentDish.name.toLowerCase()}, {currentDish.vietnamese.toLowerCase()}, 
            mix food đà nẵng, nhà hàng thái chính thống
          </p>
        </div>
      </div>
    </section>
  );
};

export default ThaiDishHighlight;

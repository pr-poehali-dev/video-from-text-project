import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const examples = [
    {
      title: 'Космическое путешествие',
      description: 'Захватывающий полёт через галактику',
      icon: 'Rocket',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Городская жизнь',
      description: 'Динамика современного мегаполиса',
      icon: 'Building2',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Природа в движении',
      description: 'Красота дикой природы в 4K',
      icon: 'Trees',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Абстрактное искусство',
      description: 'Плавные переходы и формы',
      icon: 'Sparkles',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const features = [
    { icon: 'Wand2', title: 'AI-генерация', desc: 'Нейросеть создаёт уникальное видео' },
    { icon: 'Zap', title: 'Быстро', desc: 'Результат за 2-3 минуты' },
    { icon: 'Palette', title: 'Стили', desc: 'Множество визуальных стилей' },
    { icon: 'Download', title: 'Экспорт', desc: 'Скачай в любом формате' }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
      
      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
              <Icon name="Video" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">VideoAI</span>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Примеры</a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Тарифы</a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">API</a>
          </nav>
          
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all">
            Войти
          </Button>
        </header>

        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Создавай <span className="gradient-text animate-gradient-shift bg-[length:200%_auto]">видео</span>
              <br />из текста
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Опиши свою идею — нейросеть создаст профессиональное видео за минуты.
              Никаких навыков монтажа не требуется.
            </p>

            <Card className="p-8 backdrop-blur-lg bg-card/50 border-2 border-primary/20 animate-scale-in hover:border-primary/40 transition-all">
              <div className="space-y-4">
                <Textarea
                  placeholder="Опиши своё видео: космический корабль летит сквозь туманность, камера медленно вращается..."
                  className="min-h-32 text-lg resize-none border-2 focus:border-primary transition-all"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                
                {isGenerating && (
                  <div className="space-y-2 animate-fade-in">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Создаём видео... {progress}%
                    </p>
                  </div>
                )}
                
                <Button 
                  size="lg" 
                  className="w-full text-lg h-14 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover-scale"
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                >
                  {isGenerating ? (
                    <>
                      <Icon name="Loader2" className="animate-spin mr-2" size={20} />
                      Генерируем...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" className="mr-2" size={20} />
                      Создать видео
                    </>
                  )}
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-muted/50 backdrop-blur animate-fade-in hover-scale"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <Icon name={feature.icon} size={24} className="text-primary mb-2 mx-auto" />
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Примеры <span className="gradient-text">работ</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Посмотри, что создали другие пользователи
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examples.map((example, idx) => (
              <Card 
                key={idx}
                className="group overflow-hidden hover-scale cursor-pointer animate-fade-in backdrop-blur-lg bg-card/50 border-2 border-primary/20 hover:border-primary/40 transition-all"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className={`h-48 bg-gradient-to-br ${example.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name={example.icon} size={64} className="text-white/80 animate-float" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="Play" size={48} className="text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{example.title}</h3>
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Выбери свой <span className="gradient-text">тариф</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Начни бесплатно или выбери профессиональный план
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Бесплатно',
                  price: '0₽',
                  features: ['5 видео в месяц', '720p качество', 'До 30 секунд', 'Водяной знак']
                },
                {
                  name: 'Про',
                  price: '990₽',
                  features: ['50 видео в месяц', '1080p качество', 'До 2 минут', 'Без водяных знаков'],
                  popular: true
                },
                {
                  name: 'Бизнес',
                  price: '2990₽',
                  features: ['Безлимит видео', '4K качество', 'До 10 минут', 'Приоритетная генерация']
                }
              ].map((plan, idx) => (
                <Card 
                  key={idx}
                  className={`p-6 animate-fade-in hover-scale ${
                    plan.popular 
                      ? 'border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse-glow' 
                      : 'backdrop-blur-lg bg-card/50 border-2 border-primary/20 hover:border-primary/40'
                  } transition-all`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {plan.popular && (
                    <div className="text-center mb-4">
                      <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Популярно
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-muted-foreground">/месяц</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' 
                        : 'bg-muted hover:bg-muted/80'
                    } transition-all`}
                  >
                    Выбрать
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-12 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Video" size={20} className="text-white" />
              </div>
              <span className="font-bold gradient-text">VideoAI</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Github" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Mail" size={20} />
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2025 VideoAI. Создано с помощью ИИ
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;

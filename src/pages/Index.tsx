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
      image: 'https://cdn.poehali.dev/projects/566a0628-54ce-4403-9caa-d91bbb62d2ac/files/1d909b97-a987-4de5-a7b1-c997dbc8d36f.jpg',
      duration: '0:45'
    },
    {
      title: 'Городская жизнь',
      description: 'Динамика современного мегаполиса',
      icon: 'Building2',
      image: 'https://cdn.poehali.dev/projects/566a0628-54ce-4403-9caa-d91bbb62d2ac/files/f1b6d891-f3bb-4414-ab78-0042eb371a5d.jpg',
      duration: '1:20'
    },
    {
      title: 'Природа в движении',
      description: 'Красота дикой природы в 4K',
      icon: 'Trees',
      image: 'https://cdn.poehali.dev/projects/566a0628-54ce-4403-9caa-d91bbb62d2ac/files/f2267ff0-2c23-48a5-b12e-2b13c4fc02e8.jpg',
      duration: '2:15'
    },
    {
      title: 'Абстрактное искусство',
      description: 'Плавные переходы и формы',
      icon: 'Sparkles',
      image: 'https://cdn.poehali.dev/projects/566a0628-54ce-4403-9caa-d91bbb62d2ac/files/1d909b97-a987-4de5-a7b1-c997dbc8d36f.jpg',
      duration: '1:00'
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
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={example.image} 
                    alt={example.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    {example.duration}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center animate-scale-in">
                      <Icon name="Play" size={32} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg">{example.title}</h3>
                    <Icon name={example.icon} size={20} className="text-primary shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      <span>2.4k</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Heart" size={14} />
                      <span>189</span>
                    </div>
                  </div>
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
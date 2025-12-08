import './App.css';
import TextComponent from '@/components/common/MainPageText';
import LayoutPage from './layoutPage';
import { TEXT_COMPONENTS } from './fixtures/mainPage.fixture';
import { MAIN_PAGE_LIST } from './fixtures/mainPage.fixture';
import type { MainPageListProps } from './types/mainPageText';

function App() {
  return (
    <LayoutPage>
      <div className="flex min-h-svh flex-col items-center">
        <TextComponent
          title={TEXT_COMPONENTS.top.title}
          text={TEXT_COMPONENTS.top.text}
        />
        <TextComponent
          title={TEXT_COMPONENTS.bottom.title}
          text={TEXT_COMPONENTS.bottom.text}
        >
          <ul className="list-decimal flex items-center flex-col">
            {MAIN_PAGE_LIST.map((item: MainPageListProps) => (
              <li className="text-left">{item.title}</li>
            ))}
          </ul>
        </TextComponent>
      </div>
    </LayoutPage>
  );
}

export default App;

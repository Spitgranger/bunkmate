import SendbirdApp from '@sendbird/uikit-react/App';
import '@sendbird/uikit-react/dist/index.css';


const App = () => {
  const profile = JSON.parse(localStorage.getItem('profile'));
  return (
    <div className="Messages" style={{ height: '100vh', width: '100vw' }}>
      <SendbirdApp
        appId={'9CA2D0D1-C824-406D-9911-D8ED0AEA95DC'}
        userId={profile.result.name}
        theme="dark"
        nickname="Sam"
        showSearchIcon
        allowProfileEdit
      />
    </div>
  );
};

export default App;


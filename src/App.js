import './App.css';
import rawData from './Genesis.1.json'

// TODO: put these in separate files
const Entry = props => {
  const {name, link} = props;
  return (
      <a href="{link}">{name}</a>
  );
};

const EntryList = props => {
  const { category, entries } = props;
  return (
      <details>
        <summary>{category}</summary>
          {
            entries && entries.map((entry, index) => (
              <Entry key={index} name={entry.name} link={entry.sourceRef}/>
            ))
          }
      </details>
  )
}


const App = () => {
  // TODO: consider de-duping based on sourceRef
  const processedData = {};
  rawData.forEach(item => {
    const entry = {
      name: item.index_title,
      link: item.sourceRef,
    };

    if (Array.isArray(processedData[item.category])) {
      processedData[item.category].push(entry);
    } else {
      processedData[item.category] = [entry];
    }
  });


  return (
    <div className="App">
      <header className="App-header">
        <dl>
          {Object.keys(processedData).sort().map(category => (
              <EntryList key={category} category={category} entries={processedData[category]} />
          ))}
        </dl>
      </header>
    </div>
  );
};

export default App;

// https://www.sefaria.org/api/links/Genesis.1.1?with_text=0
// Returns meta info
// Categories (category) sorted alpha
// Names (index_title)
// Links (sourceRef)
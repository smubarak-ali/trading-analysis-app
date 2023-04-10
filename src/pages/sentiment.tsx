import { Fragment, useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Bar } from "react-chartjs-2";
import numbro from "numbro";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { fetcher } from "../helper/fetcher";
import { symbols } from "../helper/forex-symbols";
import { SentimentModel, SentimentResponseModel } from "../helper/models";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const searchDdl = [
  { name: "--Select--" },
  { name: "AUD" },
  { name: "CAD" },
  { name: "CHF" },
  { name: "EUR" },
  { name: "JPY" },
  { name: "GBP" },
  { name: "NZD" },
  { name: "USD" },
];

export default function Sentiment() {
  const [filteredList, setFilteredList] = useState<SentimentModel[]>([]);
  const [searchFilterList, setSearchFilterList] = useState<SentimentModel[]>(
    []
  );
  const [selected, setSelected] = useState(searchDdl[0]);

  const { data: sentimentData } = useSWR<SentimentResponseModel>(
    "http://localhost:8080/api/report/sentiment",
    fetcher
  );

  const updateSearchFilterList = useCallback((list: SentimentModel[]) => {
    setSearchFilterList(list);
  }, []);

  useEffect(() => {
    if (!!sentimentData && sentimentData.symbols.length > 0) {
      const list: SentimentModel[] = [];
      for (const symb of sentimentData.symbols) {
        if (symbols.includes(symb.name)) {
          list.push(symb);
        }
      }
      updateSearchFilterList(list);
      setFilteredList(list);
    }
  }, [sentimentData, updateSearchFilterList]);

  const searchCurrencyChanged = (val: { name: string }) => {
    setSelected(val);

    if (val.name.match(searchDdl[0].name)) {
      setSearchFilterList(filteredList);
      return;
    }

    var list: SentimentModel[] = [];
    filteredList.forEach((x) => {
      if (x.name.match(val.name)) {
        list.push(x);
      }
    });
    setSearchFilterList(list);
  };

  return (
    <div className="p-5 flex flex-col" style={{ width: "80%" }}>
      <div className="flex flex-col px-5">
        <Listbox value={selected} onChange={searchCurrencyChanged}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {searchDdl.map((search, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={search}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {search.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <Bar
        options={{
          indexAxis: "y",
          plugins: {
            title: { display: false },
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";

                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label += numbro(context.parsed.x / 100).format({
                      output: "percent",
                      mantissa: 2,
                    });
                  }
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false,
              },
            },
            y: {
              stacked: true,
              min: 0,
              max: 100,
              grid: {
                display: false,
              },
            },
          },
          responsive: true,
        }}
        data={{
          labels: searchFilterList.map((x) => x.name),
          datasets: [
            {
              label: "Longs",
              data: searchFilterList?.map((x) => {
                return x.longPercentage;
              }),
              backgroundColor: "#0EA293",
            },
            {
              label: "Shorts",
              data: searchFilterList?.map((x) => {
                return x.shortPercentage;
              }),
              backgroundColor: "#ED2B2A",
            },
          ],
        }}
      />
    </div>
  );
}

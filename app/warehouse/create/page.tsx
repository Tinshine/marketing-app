'use client'
import { useState } from 'react';

export default function Create() {
  const item_types = [
    { key: '游戏道具', value: 0 },
    { key: '虚拟币', value: 1 },
    { key: '积分', value: 2 },
    { key: 'CDKey', value: 3 },
  ];
  const delivery_types = [
    { key: '同步', value: 0 },
    { key: '异步', value: 1 },
  ];

  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [deliveryType, setDeliveryType] = useState(0);
  const [descr, setDescr] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8888/resource/item/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        app_id: 1,
        item_type: itemType,
        item_id: itemId,
        item_name: itemName,
        delivery_type: deliveryType,
        descr: descr
      })
    });
    console.log(response);

    const data = await response.json();
    if (response.status == 200) {
      console.log("Successfully added");
      alert('成功创建道具');
    } else {
      console.log("Failed to add", data.msg);
      alert(`创建道具失败: ${data.msg}`);
    }
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
      <label htmlFor="input-label" className="block text-sm font-medium mt-4 mb-2 dark:text-white">道具名称</label>
      <input type="text" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 
      disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="道具名称" value={itemName} onChange={e => setItemName(e.target.value)} />
      <label htmlFor="hs-select-label" className="block text-sm font-medium mt-4 mb-2 dark:text-white">道具类型</label>
      <select id="hs-select-label" className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 
      disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" value={itemType} onChange={e => setItemType(Number(e.target.value))}>
        {item_types.map((option) =>
          <option key={option.key} value={option.value}>{option.key}</option>
        )}
      </select>
      <label htmlFor="input-label" className="block text-sm font-medium mt-4 mb-2 dark:text-white">道具ID</label>
      <input type="text" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 
      disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="道具ID" value={itemId} onChange={e => setItemId(Number(e.target.value))} />
      <label htmlFor="hs-select-label" className="block text-sm font-medium mt-4 mb-2 dark:text-white">发货类型</label>
      <select id="hs-select-label" className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 
      disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" value={deliveryType} onChange={e => setDeliveryType(Number(e.target.value))}>
        {delivery_types.map((option, index) =>
          <option key={option.key} value={option.value}>{option.key}</option>
        )}
      </select>
      <label htmlFor="textarea-label" className="block text-sm font-medium mt-4 mb-2 dark:text-white">道具描述</label>
      <textarea id="textarea-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 
      disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" rows={3} placeholder="Say hi..." value={descr} onChange={e => setDescr(e.target.value)} />
      <button type="button" className="mt-8 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border 
      border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={handleSubmit}>
        新建道具
      </button>
    </div>
  );
}

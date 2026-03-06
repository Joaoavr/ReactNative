import { useState , useEffect, use} from 'react';
import {View,Image,TouchableOpacity,Text,FlatList, Alert} from 'react-native';

import { Item } from '@/components/Item';
import {Button } from "@/components/Button";
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';

import { ItemsStorage, ItemStorage } from '@/storage/itemsStorage';
import { FilterStatus } from '@/types/FilterStatus';
import {styles} from './Styles';

const Filter_Status : FilterStatus[] = [FilterStatus.Pending,FilterStatus.Done]



export function Home() {
  const [filter, setFilter] = useState(FilterStatus.Pending);
  const [description, setDescription] = useState('');
  const[items, setItems] = useState<ItemStorage[]>([]);


  async function handleAddItem(){
    if(!description.trim()){
      return Alert.alert('Adicionar','informe a descrição para adicionar.');
    }
    const newItem = {
      id : Math.random().toString(36).substring(2),
      description,
      status : FilterStatus.Pending
    }
  await ItemsStorage.add(newItem);
  await itemsByStatus();

  Alert.alert("Adicionado",`${description}`);
  setFilter(FilterStatus.Pending);
  setDescription('');
  }
  
  async function itemsByStatus() {
    try {
      const response = await ItemsStorage.getByStatuts(filter);
      setItems(response);
    }catch(error){
      Alert.alert('Erro','Não foi possível filtrar os itens');
    }
  }

  async function handleRemove(id : string){
    try{
      await ItemsStorage.remove(id);
      await itemsByStatus();
    }catch(error){
      Alert.alert('Erro','Não foi possível remover o item');
    }
  }

  async function handleClear(){
    Alert.alert("Limpar","Deseja limpar a lista de compras?",[{
      text : "Não",
      style : "cancel"
    },{
      text : "Sim",
      onPress : async () => await onClear()}])
  }

  async function onClear(){
    try{
      await ItemsStorage.clear();
      setItems([]);
    }
    catch(error){
      Alert.alert('Erro','Não foi possível limpar a lista de compras');
    }
  }

  async function handleToggleStatus(id : string){
    try{
      await ItemsStorage.toggleStatus(id);
      await itemsByStatus();
    }
    catch(error){
      Alert.alert('Erro','Não foi possível atualizar o status do item');
    }
  }

    useEffect(() => {
      itemsByStatus();
    },[filter]);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/logo.png')}
        style={styles.logo}/>
      <View style={styles.form}>
      <Input placeholder='O que você precisa comprar?' onChangeText={setDescription} value={description}/>
      <Button title="Adicionar" onPress={handleAddItem}/>
      </View>
      <View style={styles.content}>
        <View style={styles.filters}>
        {Filter_Status.map((status) => (
          <Filter key={status} status={status} isActive={status === filter} onPress={() => setFilter(status)}/>
        ))}
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}><Text style={styles.clearText}>Limpar</Text></TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <Item 
              data={item} 
              onStatus={() => handleToggleStatus(item.id)} 
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.emptyListText}>Nenhum item cadastrado</Text>}
        />
      </View>
    </View>
  );
}
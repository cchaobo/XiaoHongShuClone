import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const PublishScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handlePublish = () => {
    //publish
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Content"
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Tags (comma-separated)"
        value={tags}
        onChangeText={setTags}
      />
      <Button title="Publish" onPress={handlePublish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(221, 221, 221, 1)',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
  },
});

export default PublishScreen;